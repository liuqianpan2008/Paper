import { createRouter, createWebHashHistory } from "vue-router";
//引入组件
import login from "./components/login/login.vue";
import MIAN from "./components/main.vue";
import UserRegister from "./components/login/UserRegister.vue";
import SendPaper from "./components/sendpaper/SendPaper.vue";
import PaperCard from "./components/sendpaper/PaperCard.vue";
import Global from "./Global.vue";
import MyPaperCard from "./components/sendpaper/MyPaperCard.vue";
import PaperCut from "./components/MyseeCard/PaperCut.vue";
import CollectCards from "./components/MyseeCard/CollectCards.vue";
import MyseeCard from "./components/MyseeCard/MySeepaperCard.vue";
import UserSetUp from "./components/UserSetUp/UserSetUp.vue";
import personal from "./components/UserSetUp/personal.vue";
import setpassworld from "./components/UserSetUp/setuserpassword.vue";
import Retrieve from "./components/login/Retrieve.vue";
import PublicPaper from "./components/Publicpaper/PublicPaper.vue";
import Help from "./components/help/help.vue";
import AboutUs from "./components/help/AboutUs.vue";
import HelpSeedPaper from "./components/help/HelpSeedPaper.vue";
import HelpSee from "./components/help/HelpSee.vue";
import chat from "./components/chat.vue";
import axios from "axios";
import config from "@/config/index";
//配置路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        isAuth: true,
      },
      beforeEnter(to, from, next) {
        if (!Global.IsLog.value) {
          next();
        } else {
          alert("你已登录!");
        }
      },
    },
    {
      path: "/PublicPaper",
      component: PublicPaper,
      beforeEnter(to, form, next) {
        //初始化获取数据
        axios({
          url: config.baseURL + "/papers/public_p",
          method: "post",
          headers: {
            satoken: localStorage.getItem("Token"),
          },
          data: {
            current: "1",
            Size: "4",
            seed: "0",
          },
        })
          .then((response) => {
            const info = response.data;
            // console.log(PublicPaper.pagenumber.value);
            PublicPaper.pagenumber.value = info.date.pages;
            Global.card.value = info.date.records;
          })
          .catch((response) => {
            console.log(response);

            alert("API获取失败");
          });
        next();
      },
    },
    {
      path: "/Retrieve",
      component: Retrieve,
      beforeEnter(to, from, next) {
        if (!Global.IsLog.value) {
          next();
        } else {
          alert("你已登录!");
        }
      },
    },
    {
      path: "/",
      component: MIAN,
    },
    {
      path: "/register",
      component: UserRegister,
      beforeEnter(to, from, next) {
        if (!Global.IsLog.value) {
          next();
        } else {
          alert("你已登录！");
        }
      },
    },
    {
      path: "/sendpaper",
      component: SendPaper,
      children: [
        {
          path: "PaperCard",
          component: PaperCard,
          beforeEnter(to, form, next) {
            if (Global.IsLog.value) {
              axios({
                url: config.baseURL + "/papers/getpaper",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
                data: {
                  Isaccept: false,
                },
              }).then((e) => {
                const info = e.data;
                PaperCard.sendInfo.value = info.date;
              });
              next();
            } else {
              alert("该功能登录后使用，请去登录！");
            }
          },
        },
        {
          path: "MyPaperCard",
          component: MyPaperCard,
          beforeEnter(to, form, next) {
            if (Global.IsLog.value) {
              //初始化获取数据
              axios({
                url: config.baseURL + "/papers/seedlistpaper",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
                data: {
                  current: "1",
                  Size: "4",
                  seed: "0",
                },
              })
                .then((response) => {
                  const info = response.data;
                  MyPaperCard.pagenumber.value = info.date.pages;
                  Global.card.value = info.date.records;
                })
                .catch((response) => {
                  alert("API获取失败");
                });
              next();
            } else {
              alert("该功能登录后使用，请去登录！");
            }
          },
        },
        {
          path: "MyPaperCard",
          component: MyPaperCard,
        },
      ],
    },
    {
      path: "/PaperCut",
      component: PaperCut,
      children: [
        {
          path: "CollectCards",
          component: CollectCards,
          beforeEnter(to, form, next) {
            if (Global.IsLog.value) {
              axios({
                url: config.baseURL + "/papers/getpaper",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
                data: {
                  Isaccept: true,
                },
              }).then((e) => {
                const info = e.data;
                CollectCards.AcceptCard.value = info.date;
              });
              next();
            } else {
              alert("该功能登录后使用，请去登录！");
            }
          },
        },
        {
          path: "MyseeCard",
          component: MyseeCard,
          beforeEnter(to, form, next) {
            if (Global.IsLog.value) {
              axios({
                url: config.baseURL + "/papers/seedlistpaper",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
                data: {
                  current: "1",
                  Size: "4",
                  seed: "1",
                },
              })
                .then((response) => {
                  const info = response.data;
                  MyseeCard.pagenumber.value = info.date.pages;
                  Global.card.value = info.date.records;
                })
                .catch((response) => {
                  alert("API获取失败");
                });
              next();
            } else {
              alert("该功能登录后使用，请去登录！");
            }
          },
        },
      ],
    },
    {
      path: "/UserSetUp",
      component: UserSetUp,
      beforeEnter(to, from, next) {
        if (Global.IsLog.value) {
          next();
        } else {
          alert("你还没登录呢");
        }
      },
      children: [
        {
          path: "personal",
          component: personal,
          beforeEnter(to, from, next) {
            if (Global.IsLog.value) {
              axios({
                url: config.baseURL + "/users/List",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
              }).then((e) => {
                Global.User.value = e.data.date;
                console.log(Global.User.value);
              });
              axios({
                url: config.baseURL + "/users/IsSign",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
              }).then((e) => {
                const info = e.data;
                personal.SignRef.value = !info.date;
              });
              next();
            } else {
              alert("你还没登录呢");
            }
          },
        },
        {
          path: "SetPassword",
          component: setpassworld,
          beforeEnter(to, from, next) {
            if (Global.IsLog.value) {
              axios({
                url: config.baseURL + "/users/List",
                method: "post",
                headers: {
                  satoken: localStorage.getItem("Token"),
                },
              }).then((e) => {
                Global.User.value = e.data.date;
                console.log(Global.User.value);
              });
              next();
            } else {
              alert("你还没登录呢");
            }
          },
        },
      ],
    },
    {
      path: "/help",
      component: Help,
      children: [
        {
          path: "AboutUs",
          component: AboutUs,
        },
        {
          path: "HelpSeedPaper",
          component: HelpSeedPaper,
        },
        {
          path: "HelpSeePaper",
          component: HelpSee,
        },
      ],
    },
    {
      path: "/chat",
      component: chat,

      beforeEnter(to, from, next) {
        if (Global.IsLog.value) {
          next();
        } else {
          alert("你还没登录呢");
        }
      },
    },
  ],
});
export default router;
