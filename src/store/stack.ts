import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    cards: [],
  },

  mutations: {
    setCards(state, data) {
      state.cards = data;
    },
    updateCards(state, data) {
      state.cards = [...state.cards, ...data];
    },
    shift(state) {
      console.log('Shifting');
      state.cards.shift();
    },
    clear(state) {
      state.cards = [];
    },
  },

  actions: {
    async fetch({ commit }) : Promise<boolean> {
      try {
        const { data } = await Axios.get('http://pickalook-server.herokuapp.com/stack');

        console.log('STACK', data);

        const cards = data.map((card) => ({
          name: card.name,
          code: card.code,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image, card.image, card.image],
          srcsets: [card.srcset, card.srcset, card.srcset],
          type: 'clothing',
          url: card.url,
        }));

        commit('updateCards', cards);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async fetchPopulars({ commit }) : Promise<boolean> {
      try {
        const { data } = await Axios.get('http://pickalook-server.herokuapp.com/populars');

        console.log('STACK', data);

        const cards = data.map((card) => ({
          name: card.name,
          code: card.code,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image, card.image, card.image],
          srcsets: [card.srcset, card.srcset, card.srcset],
          type: 'clothing',
          url: card.url,
        }));

        commit('updateCards', cards);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async getProduct(_, code) {
      try {
        const { data } = await Axios.get(`http://pickalook-server.herokuapp.com/product/${code}`);
        return data;
      } catch (err) {
        console.error(err);
        return null;
      }
    },

    async vote(_, { code, rating }) {
      console.log(code);
      try {
        await Axios.post('http://pickalook-server.herokuapp.com/vote', {
          clothing: code,
          rating,
        });
      } catch (err) {
        console.error(err);
      }
    },

    async like(_, clothing) {
      console.log(clothing);
      try {
        await Axios.post('http://pickalook-server.herokuapp.com/like', {
          clothing,
        });
      } catch (err) {
        console.error(err);
      }
    },

    async dislike(_, clothing) {
      console.log(clothing);
      try {
        await Axios.post('http://pickalook-server.herokuapp.com/dislike', {
          clothing,
        });
      } catch (err) {
        console.error(err);
      }
    },

    async bought(_, clothing) {
      console.log(clothing);
      try {
        await Axios.post('http://pickalook-server.herokuapp.com/buy', {
          clothing,
        });
      } catch (err) {
        console.error(err);
      }
    },

    async fav(_, clothing) {
      console.log(clothing);
      try {
        await Axios.post('http://pickalook-server.herokuapp.com/fav', {
          clothing,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
