export async function getFoods() {
  const response = await fetch("https://learn.codeit.kr/0220/foods");
  const body = response.json();
  return body;
}
