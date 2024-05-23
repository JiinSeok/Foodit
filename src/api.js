export async function getFoods({ order = "", cursor = "", limit = 10 }) {
  let query = "";
  if (order) {
    query += `order=${order}`;
  }
  if (cursor) {
    query += `&cursor=${cursor}`;
  }
  if (limit > 0) {
    query += `&limit=${limit}`;
  }
  // const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/0220/foods/?${query}`);
  const body = response.json();
  return body;
}
