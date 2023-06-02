export default function sort(datas) {
  const sortDatas = Object.values(datas).sort((a, b) => {
    return a.nomdefamille.localeCompare(b.nomdefamille);
  });
  return sortDatas;
}
