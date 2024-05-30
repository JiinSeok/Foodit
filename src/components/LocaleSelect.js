import { useLocale, useSetLocale } from "../contexts/LocaleContext"

const LocaleSelect = () => {
  const locale = useLocale();
  const setLocale = useSetLocale(); // setter 함수 리턴 받아 선언

  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange}>
      <option value={'ko'}>한국어</option>
      <option value={'en'}>English</option>
    </select>
  );
}

export default LocaleSelect;