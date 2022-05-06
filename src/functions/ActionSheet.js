import Toast from 'react-native-toast-message';
import { navigateAction } from './NavigationService';
import {
  goToAddWish, goToAddWishList, goToShareScreen, goToWishList
} from './helpers';
import { archiveWishList, deleteWish, deleteWishList } from '../redux/actions/wishListActions';
import { deleteFriend } from '../redux/actions/userActions';
import { GO_BACK_ID } from '../redux/constants/wishConstants';
import store from '../redux';

export class ActionSheets {
  constructor(showActionSheetWithOptions) {
    this.showActionSheetWithOptions = showActionSheetWithOptions;
  }

  deleteWishList(id, el, close, goToWishListFunc) {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Удалить'],
      title: 'Удалить вишлист?',
      message: 'Это действие нельзя будет отменить',
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1,
      userInterfaceStyle: 'dark'
    }, async (buttonIndexChild) => {
      if (buttonIndexChild === 1) {
        await deleteWishList(id, el?.private);
        if (close) {
          close();
        }
        if (goToWishListFunc) {
          goToWishList();
        }
        Toast.show({
          type: 'search',
          text1: 'Вишлист удален',
          position: 'bottom',
          bottomOffset: 95
        });
      }
    });
  }

  showShareAction(close) {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Поделиться'],
      cancelButtonIndex: 0,
      useModal: true,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
        close();
      }
    });
  }

  showShareActionInMyWish(id, close, backEdit) {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Изменить', 'Поделиться', 'Удалить'],
      message: 'Что ты хочешь сделать с этим желанием?',
      cancelButtonIndex: 0,
      useModal: true,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        goToAddWish({ id, backEdit });
        if (close) {
          close();
        }
      }
      if (buttonIndex === 2) {
        goToShareScreen();
        if (close) {
          close();
        }
      }
      if (buttonIndex === 3) {
        this.showActionSheetWithOptions({
          options: ['Отмена', 'Удалить'],
          title: 'Удалить желание?',
          message: 'Это действие нельзя будет отменить',
          cancelButtonIndex: 0,
          destructiveButtonIndex: 1,
          userInterfaceStyle: 'dark'
        }, async (buttonIndexChild) => {
          if (buttonIndexChild === 1) {
            await deleteWish(id);
            if (close) {
              close();
            }
            Toast.show({
              type: 'search',
              text1: 'Желание удалено',
              position: 'bottom',
              bottomOffset: 95
            });
          }
        });
      }
    });
  }

  showShareActionInMyWishList(id, el, privateMode, archiveMode, close, parent, goToWishListFunc) {
    if (archiveMode) {
      this.showActionSheetWithOptions({
        options: ['Отмена', 'Изменить', 'Опубликовать', 'Удалить'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          await goToAddWishList({ id });
          parent.setOptions({ tabBarStyle: { display: 'none' } });
        }
        if (buttonIndex === 2) {
          this.showActionSheetWithOptions({
            options: ['Отмена', 'Опубликовать'],
            title: 'Опубликовать вишлист?',
            message: 'Другие пользователи снова будут видеть этот вишлист у тебя в профиле',
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, async (buttonIndexChild) => {
            if (buttonIndexChild === 1) {
              await archiveWishList(id, el?.private, el, false);
            }
          });
        }
        if (buttonIndex === 3) {
          this.deleteWishList(id, el, close, goToWishListFunc);
        }
      });
    } else {
      this.showActionSheetWithOptions({
        options: ['Отмена', 'Изменить', 'Поделиться', 'Архивировать', 'Удалить'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          await goToAddWishList({ id });
          parent.setOptions({ tabBarStyle: { display: 'none' } });
        }
        if (buttonIndex === 2) {
          goToShareScreen();
        }
        if (buttonIndex === 3) {
          this.showActionSheetWithOptions({
            options: ['Отмена', 'Архивировать'],
            title: 'Отправить вишлист в архив?',
            message: 'Другие пользователи перестанут видеть этот вишлист у тебя в профиле',
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, async (buttonIndexChild) => {
            if (buttonIndexChild === 1) {
              await archiveWishList(id, el?.private, el);
            }
          });
        }
        if (buttonIndex === 4) {
          this.deleteWishList(id, el, close, goToWishListFunc);
        }
      });
    }
  }
}
