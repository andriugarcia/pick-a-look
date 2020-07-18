import Axios from 'axios';

export default {
  namespaced: true,

  actions: {
    async updateFilters(_, filters) {
      console.log(filters);
      await Axios.post(`${process.env.VUE_APP_ENDPOINT}/updateFilters`, {
        filters
      })
    },
    async updateGenre(_, genre) {
      console.log(genre);
      await Axios.post(`${process.env.VUE_APP_ENDPOINT}/updateGenre`, {
        genre
      })
    },

    async historial(_, order) : Promise<Array<Object>> {
      console.log('HISTORIAL', order);
      try {
        const { data } = await Axios.get(`${process.env.VUE_APP_ENDPOINT}/historial/${order}`);
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: card.url,
          code: card.code,
          srcsets: [card.srcset],
        }));
        console.log(clothes);
        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async likes() : Promise<Array<Object>> {
      console.log('LIKES');
      try {
        const { data } = await Axios.get(`${process.env.VUE_APP_ENDPOINT}/likes`);
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: card.url,
          code: card.code,
          srcsets: [card.srcset],
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async dislikes() : Promise<Array<Object>> {
      try {
        const { data } = await Axios.get(`${process.env.VUE_APP_ENDPOINT}/dislikes`);
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
          code: card.code,
          srcsets: [card.srcset],
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async bought() : Promise<Array<Object>> {
      try {
        const { data } = await Axios.get(`${process.env.VUE_APP_ENDPOINT}/bought`);
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
          code: card.code,
          srcsets: [card.srcset],
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async favorites() : Promise<Array<Object>> {
      try {
        const { data } = await Axios.get(`${process.env.VUE_APP_ENDPOINT}/favorites`);
        const clothes = data.map((card) => ({
          name: card.name,
          description: '',
          price: card.price,
          brand: card.brand,
          pictures: [card.image],
          url: '',
          code: card.code,
          srcsets: [card.srcset],
        }));

        return clothes;
      } catch (err) {
        console.error(err);
        return [];
      }
    },
  },
};
