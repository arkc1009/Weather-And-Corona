export type widthRadioKeysType = 'daysRadio' | 'cloudsRadio' | 'iconRadio' | 'tempRadio';

export type widthRadioType = {
  [k in widthRadioKeysType]: string;
};
