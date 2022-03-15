import { navigateAction } from './NavigationService';

export class ActionSheets {
  constructor(showActionSheetWithOptions) {
    this.showActionSheetWithOptions = showActionSheetWithOptions;
  }

  showShareAction() {
    this.showActionSheetWithOptions({
      options: ['Отмена', 'Поделиться'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
      }
    });
  }
}
