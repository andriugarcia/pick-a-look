import Axios from 'axios';

export default {
  namespaced: true,

  actions: {
    async likes() : Promise<Array<Object>> {
      console.log('LIKES');
      try {
        const { data } = await Axios.get('http://pickalook-server.herokuapp.com/likes');
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
        const { data } = await Axios.get('http://pickalook-server.herokuapp.com/dislikes');
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
        const { data } = await Axios.get('http://pickalook-server.herokuapp.com/bought');
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
        const { data } = await Axios.get('http://pickalook-server.herokuapp.com/favorites');
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
