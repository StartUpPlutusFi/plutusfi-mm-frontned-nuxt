import { defineStore } from "pinia";

type RootState = {
  routes: Route[];
};

export interface Route {
  path: string;
  text: string;
  active?: boolean;
}

export const useNavBar = defineStore("navbar", {
  state: () =>
    ({
      routes: [],
    } as RootState),
  getters: {
    getRoutes: (state) => state.routes,
  },
  actions: {
    addRoute(route: Route) {
      this.routes.push(route);
    },
    addRoutes(routes: Route[]) {
      this.routes = [...routes];
    },
    setActiveRoute(path: string) {
      this.routes = this.routes.map((route: Route) => {
        if (route.path === path) {
          return { ...route, active: true } as Route;
        } else {
          const updated = { ...route, active: false } as Route;
          return updated;
        }
      });
    },
  },
});
