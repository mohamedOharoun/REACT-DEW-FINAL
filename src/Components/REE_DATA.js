import {useState, useEffect} from 'react';

export const REE_DATA = () => {
    const [prices, setPrices] = useState([]);
    //Solicitaremos los datos a REE
    const getPrices = async () => {
        const d = new Date();
        const pricesREE = await fetch(`https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T00:00&end_date=${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T23:59&time_trunc=hour`)
        .then(res => res.json())
        .then(res => res.included[0].attributes.values);

        setPrices(pricesREE);
    };
    //Obtendremos los precios siempre que se acceda a la página
    useEffect(() => {
        getPrices();
        
    }, []);

    return (<div className="col-lg-3 card mt-3">
        <div className="card-body">
            <div className="card-header" style={{textAlign: 'center'}}>
                Precios de la Luz
            </div>
            <ul className="list-group list-group-flush">
                {prices.map((price, i) => {
                    return(
                        <li key={i} className="list-group-item d-flex justify-content-between">
                            <div>{((i<10) ? '0' + i  : i) + ':00'}</div>
                            <div>{Math.round(price.value * 10, 4)/10000 + '\u20AC/kWh'}</div>
                        </li>
                        
                    )
                })}
            </ul>
            
        </div>

    </div>)
}

export default REE_DATA;