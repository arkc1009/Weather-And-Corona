export const cityName = (city: number): string => {
  switch (city) {
    case 0:
      return '지역';
    case 1835847:
      return '서울';
    case 1838519:
      return '부산';
    case 1835327:
      return '대구';
    case 1843561:
      return '인천';
    case 1841808:
      return '광주';
    case 1835224:
      return '대전';
    case 1833742:
      return '울산';
    case 9999999:
      return '세종';
    case 1841610:
      return '경기';
    case 1843125:
      return '강원';
    case 1845105:
      return '충남';
    case 1845106:
      return '충북';
    case 1845788:
      return '전남';
    case 1845789:
      return '전북';
    case 1902028:
      return '경남';
    case 1841597:
      return '경북';
    case 1846265:
      return '제주';
    default:
      return '';
  }
};
