# Shopping Mall


## 결과 확인
### **http://kwoneuijung-shopping.surge.sh** 에서 확인 가능


## 쇼핑몰 설명
- 상품 / 쇼핑몰 리스트 2개의 Tab이 존재하는 **반응형 웹 페이지**
- `상품 탭`에서는 상품 이미지가 3 그리드로 보여지며, 클릭시 상품 랜딩 url로 이동
- `쇼핑몰 탭`에서는 쇼핑몰 리스트가 보여지며, 클릭시 쇼핑몰 랜딩 url로 이동


## 구현 환경
- **React**, **Redux**, CSS


## 프로젝트 동작
### - Project setup
```
npm install
```
프로젝트를 setup 하기 위한 명령어입니다.
프로젝트에 사용된 모듈을 해당 명령어로 install 해주세요.

### - Runs the app in the development mode
```
npm start
```
개발 모드로 실행시키는 명령어입니다.
이 명령어를 사용하여 프로젝트를 실행 시켜주세요.
실행화면은 [http://localhost:3000](http://localhost:3000) 에서 확인하실 수 있습니다.

### - Builds the app for production
```
npm run build
```
배포를 위해 앱을 빌드하기 위한 명령어입니다.
이 명령어를 사용하면 `build` 폴더에 빌드합니다.


## 세부 설명
### - polyfill 적용
IE9 이상 버전을 위해 `react-app-polyfill` 모듈 사용.
```js
// src/index.js 가장 첫 줄에 삽입해야 함.
import 'react-app-polyfill/ie9';

// ...
```

### - 모바일 기기 체크
상품 탭에서 상품 클릭시 랜딩 url로 이동할 때, 기기에 따른 url 이동을 위해 모바일 기기인지 체크.
`react-device-detect` 모듈 사용.

```js
// src/components/Item.js
import { isMobile } from 'react-device-detect';

    // ...
    constructor(props) {
        super();

        this.state = {
            isMobile : isMobile, //mobile check (mobile일 경우 true, 아닐경우 false)
        }
    }

    // ...
```

### - 상품탭 Sort 기능
상품 탭에 sort 기능을 추가하여 `인기순` / `가격 높은순` / `가격 낮은순` 으로 Sort 가능.
상품 탭 진입시 sort default 값은 인기순으로 설정함.
[underscore.js](https://underscorejs.org/) 사용.

```js
// src/components/Item.js
import { sortBy } from 'underscore';

    sortItemList(type){

        // ...
        let list = this.state.itemList;
        let newList = list;

        if(type === 'asc'){
            newList = sortBy(list, 'price');
        }else if(type === 'desc'){
            newList = sortBy(list, 'price').reverse();
        }

        // ...
```