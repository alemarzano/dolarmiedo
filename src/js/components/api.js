export const coinQuotes = {};
const API_URL = 'https://api.bluelytics.com.ar/v2/latest';
export async function getDolarQuote() {
  let dolarBlue = null;
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    Object.keys(data).forEach((key) => {
      if (
        key !== 'last_update' &&
        key !== 'oficial_euro' &&
        key !== 'blue_euro'
      ) {
        coinQuotes[key] = {
          ...data[key],
          last_update: data.last_update,
        };
      }
    });
    dolarBlue = data.blue.value_sell;
  } catch (error) {
    console.error('Error al obtener la cotización del dolar blue:', error);
  }

  return dolarBlue;
}
