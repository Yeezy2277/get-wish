import NavigationService, { navigateAction } from './NavigationService';

export function goToStart() {
  NavigationService.navigate('Start');
}

export function goToMain() {
  navigateAction('MainProfile');
}
