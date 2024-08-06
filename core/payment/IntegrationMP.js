
// -------------------------------------------------------------------------- //

import { MainMP, TokenSG } from '../../api/Config';

// -------------------------------------------------------------------------- //

export const handleIntegrationMP = async (name, description, price, type) => {

    const Preference = {
        "items": [
            {
                "title": `${name}`,
                "description": `${description}`,
                "picture_url": 'https://gitlab.com/ed.cetacean/ReactProject/-/raw/main/Disenchanted/assets/CodeWave.png?ref_type=heads',
                "category_id": `${type}`,
                "quantity": 1,
                "currency_id": "MXN",
                "unit_price": price,
            }
        ],
    };

    // ---------------------------------------------------------------------- //

    try {
        const response = await fetch(`${MainMP}checkout/preferences`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenSG}`
            },

            body: JSON.stringify(Preference)
        });

        if (response.ok) {
            const data = await response.json();
            return data.init_point;

        } else {
            console.error('Ha ocurrido un error con los datos de compra.');
        }

    } catch (error) {
        console.error('No se pudo realizar la compra: ', error);
    }

};

// -------------------------------------------------------------------------- //
