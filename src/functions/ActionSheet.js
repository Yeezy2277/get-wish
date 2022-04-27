import { navigateAction } from './NavigationService';
import { goToAddWish, goToAddWishList, goToShareScreen } from './helpers';
import { archiveWishList, deleteWish, deleteWishList } from '../redux/actions/wishListActions';

export class ActionSheets {
  constructor(showActionSheetWithOptions) {
    this.showActionSheetWithOptions = showActionSheetWithOptions;
  }

  showShareAction(close) {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Поделиться'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
        close();
      }
    });
  }

  showShareActionInMyWish(id, close) {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Изменить', 'Поделиться', 'Удалить'],
      cancelButtonIndex: 0,
      useModal: true,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        goToAddWish({ id });
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
        await deleteWish(id);
        if (close) {
          close();
        }
      }
    });
  }

  showShareActionInMyWishList(id, el) {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Изменить', 'Поделиться', 'Архивировать', 'Удалить'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        goToAddWishList({ id });
      }
      if (buttonIndex === 3) {
        await archiveWishList(id, el?.private, el);
      }
      if (buttonIndex === 4) {
        await deleteWishList(id, el?.private);
      }
    });
  }
}
