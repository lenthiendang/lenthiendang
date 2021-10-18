/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

import User, { checkTokenExpire } from '../../class/User';
import Server from '../../class/Server';
import Browser from '../../class/Browser';

import {
  setOriginalBalance,
  setBalance,
  setInfo,
  setPrivilege,
} from './accountSlice';
import { updateCandles } from './priceSlice';
import { sleep } from '../../../utils';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isOpenBrowser: true,
    showForm: true,
    status: null,
    isLoggedInSuccess: false,
    accessToken: null,
    refreshToken: null,
    uid: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleLoggedInSuccess: (state, action) => {
      state.isLoggedInSuccess = action.payload;
    },
    toggleForm: (state, action) => {
      state.showForm = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const {
  setStatus,
  toggleLoggedInSuccess,
  toggleForm,
  setToken,
  setUid,
} = authSlice.actions;

export const resetToken = () => async (dispatch, getState) => {
  const { auth } = getState((store) => store.auth);
  const user = new User({ refreshToken: auth.refreshToken });
  await user.resetToken();
  const { accessToken, refreshToken } = user;
  if (refreshToken && accessToken) {
    dispatch(setToken({ accessToken, refreshToken }));
  } else {
    console.log('Loi resetToken', user);
  }
};

export const loginWithToken = (token) => async (dispatch, getState) => {
  dispatch(setStatus(`Đang kết nối đến máy chủ ${process.env.EXCHANGE}!`));
  const {
    account: { accountType },
    auth: { isOpenBrowser },
  } = getState((store) => store);

  dispatch(toggleForm(false));

  if (checkTokenExpire(token.refreshToken)) {
    const user = new User({ refreshToken: token.refreshToken });
    await user.init();
    if (user.accessToken) {
      try {
        const {
          accessToken,
          refreshToken,
          name,
          email,
          sponsor,
          photo,
          enabled2fa,
          balances,
          data,
          uid,
        } = user;

        const server = new Server({ accessToken });
        const res = await server.checkUser({
          name,
          sponsor,
          exchange: process.env.EXCHANGE,
          data,
        });
        const { expiredOn, candle, role, fn } = res;

        if (fn === null) {
          dispatch(
            setStatus(
              `Tài khoản ${name} của quý khách không thuộc team nội bộ. Vui lòng liên hệ admin!`
            )
          );
        } else if (fn >= 0) {
          dispatch(setPrivilege({ expiredOn, role, candle, fn }));

          dispatch(setToken({ accessToken, refreshToken }));
          dispatch(setUid(uid));

          dispatch(setInfo({ email, name, sponsor, photo, enabled2fa }));
          dispatch(setOriginalBalance(balances[accountType]));
          dispatch(setBalance(balances[accountType]));

          dispatch(updateCandles(user.accessToken));
          dispatch(toggleLoggedInSuccess(true));

          if (isOpenBrowser) {
            const browser = new Browser();
            await browser.loginOnBrowserWithToken(email, refreshToken);
          }
          dispatch(
            setStatus(
              `Xin chào ${name}!\n LenThienDang đang chuẩn bị dữ liệu cho quý khách!`
            )
          );
          await sleep(2000);
          dispatch(toggleForm(false));
        } else {
          dispatch(
            setStatus(
              `Tài khoản ${name} của quý khách đã bị khoá. Nếu đây là sự nhầm lẫn, vui lòng liên hệ admin!`
            )
          );
        }
      } catch (err) {
        console.log(err);
        dispatch(
          setStatus('Không thể kết nối server! Vui lòng liên hệ admin!')
        );
      }
    } else {
      console.log('err');

      dispatch(setStatus('Phiên đăng nhập hết hạn!\nVui lòng đăng nhập lại!'));
      await sleep(2000);
      dispatch(setStatus(null));
    }
  } else {
    dispatch(setStatus('Phiên đăng nhập hết hạn!\nVui lòng đăng nhập lại!'));
    await sleep(2000);
    dispatch(setStatus(null));
  }
};

export const getTokenWithBrowser = (account) => async (dispatch) => {
  try {
    dispatch(setStatus('Vui lòng đăng nhập tài khoản trên trình duyệt!'));
    dispatch(toggleForm(false));
    const browser = new Browser();
    const res = await browser.loginWithEmailAndPassword(account);
    console.log(res.data);

    if (res.data.local) {
      dispatch(
        loginWithToken({
          email: account.email,
          refreshToken: res.data.local.refreshToken,
        })
      );
    } else if (res.data.name) {
      // show handled error name
      dispatch(
        setStatus(
          `Lỗi trình duyệt ${res.data.name}. Vui lòng báo lại lỗi với bộ phận IT!`
        )
      );
    } else {
      // show unhandled error name
      dispatch(
        setStatus(
          'Lỗi trình duyệt: Thông tin đăng nhập không đúng, vui lòng đăng nhập lại!'
        )
      );
    }
  } catch (err) {
    dispatch(
      setStatus('Lỗi trình duyệt: Không thể kết nối đến trình duyệt web!')
    );
    await sleep(5000);
  }
};

export default authSlice.reducer;
