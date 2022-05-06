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
  constructor(t, showActionSheetWithOptions) {
    this.t = t;
    this.showActionSheetWithOptions = showActionSheetWithOptions;
  }

  deleteWishList(id, el, close, goToWishListFunc) {
    const { t } = this.props;
    this.showActionSheetWithOptions({
      options: [
          this.t('cancel'),
        this.t('delete'),
      ],
      title: this.t('wishlists_delete'),
      message: this.t('nonCancelable'),
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
          text1: this.t('wishlists_deleted'),
          position: 'bottom',
          bottomOffset: 95
        });
      }
    });
  }

  showShareAction(close) {
    this.showActionSheetWithOptions({
      options: [this.t('cancel'), this.t('share')],
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
      options: [
          this.t('cancel'),
        this.t('change'),
        this.t('share'),
        this.t('delete'),
      ],
      message: this.t('wishlists_actions'),
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
          options: [this.t('cancel'), this.t('delete')],
          title: this.t('desires_delete'),
          message: this.t('nonCancelable'),
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
              text1: this.t('desires_deleted'),
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
        options: [
            this.t('cancel'),
          this.t('change'),
          this.t('publish'),
          this.t('delete')],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          await goToAddWishList({ id });
          parent.setOptions({ tabBarStyle: { display: 'none' } });
        }
        if (buttonIndex === 2) {
          this.showActionSheetWithOptions({
            options: [
                this.t('cancel'),
              this.t('publish')
            ],
            title: this.t('wishlists_publish'),
            message: this.t('wishlists_publishInfo'),
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
        options: [
            this.t('cancel'),
          this.t('change'),
          this.t('share'),
          this.t('archive'),
          this.t('delete')],
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
            options: [this.t('cancel'), this.t('archive')],
            title: this.t('wishlists_archiveList'),
            message: this.t('wishlists_archiveListInfo'),
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
