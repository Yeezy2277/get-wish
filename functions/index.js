export const delay = ms => new Promise(res => setTimeout(() => res(), ms));

export const androidShadow = {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
}
