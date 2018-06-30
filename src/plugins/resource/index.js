import cache from "../cache";
import api from '../../api/api';

export default {
  install:(Vue,resources={})=>{
    Vue.prototype.$getResource=async function(method,options) {
      let name = this.$options.resource;
      if(!name||!resources[name]||!resources[name][method]) return;
      const {path,resolve}=resources[name][method](options);
      const mappers={
        pipe:(dataSet)=>Promise.resolve(dataSet)
      }


      if(cache.has(path)) {
        return resolve(cache.get(path),mappers);
      }
      


      return api().get(path)
      .then(response => cache.set(response.data, path))
      .then(data => resolve(data, mappers));

    }
  }
}