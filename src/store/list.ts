import Axios from 'axios';

export default {
  namespaced: true,

  actions: {
    async likes() : Promise<Array<Object>> {
      console.log('LIKES');
      try {
        const { data } = await Axios.get('http://localhost:3010/likes');
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async dislikes() : Promise<Array<Object>> {
      try {
        const { data } = await Axios.get('http://localhost:3010/dislikes');
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async bought() : Promise<Array<Object>> {
      try {
        const { data } = await Axios.get('http://localhost:3010/bought');
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async favorites() : Promise<Array<Object>> {
      try {
        const { data } = await Axios.get('http://localhost:3010/favorites');
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },
  },
};
