import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ children, defaultValue='ko' }) {
  const [locale, setLocale] = useState(defaultValue);

  return <LocaleContext.Provider value={{
    locale, setLocale, // LocaleProvider가 value로 설정하여 children 안에서 사용할 수 있게 한 locale과 setter 함수
  }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('LocaleProvider 안에서 사용하세요.')
  }

  return context.locale; 
}

export function useSetLocale() {
  const context = useContext(LocaleContext); // LocaleContext 컨텍스트를 받아오며 Provider value 값인 객체를 리턴 받게 된다.

  if (!context) {
    throw new Error('LocaleProvider 안에서 사용하세요.')
  }

  return context.setLocale; // setter 함수 리턴!
}

// export default LocaleContext; 만 export 하는 경우!
// export하면 호환성을 위해 유지보수 해야하지만 캡슐화하면 내부 변경의 영향을 최소화할 수 있습니다. 내부 로직을 외부에서 사용하지 않으면 나중에 코드 변경이 용이합니다.
// 불필요한 export는 피하는 편이 좋습니다. - 캡슐화