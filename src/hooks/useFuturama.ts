export default function useFuturama() {
  const fetchFuturama = async () => {
    const response = await fetch('https://api.sampleapis.com/futurama/characters');
    const data = await response.json();
    console.table(data);
    return data;
  };
  return {
    fetchFuturama,
  };
}
