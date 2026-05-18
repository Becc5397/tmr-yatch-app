import { useState, useEffect } from 'react';

export function useClimaMarino() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClima() {
      try {
        setCargando(true);
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=10.3997&longitude=-75.5144&current=temperature_2m,windspeed_10m,winddirection_10m&timezone=America%2FBogota'
        );

        if (!res.ok) throw new Error('Error al conectar con la API');

        const data = await res.json();

        setClima({
          temperatura: data.current.temperature_2m,
          viento: data.current.windspeed_10m,
          direccion: data.current.winddirection_10m,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    fetchClima();
  }, []);

  return { clima, cargando, error };
}