import weather from '../../fake-weather';

import templateBuilder from './templateBuilder';
export let cityData = null;
export function loadData(cityName) {
    const tb = new templateBuilder();
    tb.constructLoading();
    // fake delay
    setTimeout(() => {
        const data = weather.find(el => el.city === cityName);
        if (!data) {
            throw Error('No data for the city')
        }
        cityData = data;
        tb.fillData(data);
        tb.fillPage();
    }, 3000)
}