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
import axios from "axios";
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
        if (Global.User.value == "") {
          next();
        } else {
          alert("你已登录!");
        }
      },
    },
    {
      path: "/Retrieve",
      component: Retrieve,
      beforeEnter(to, from, next) {
        if (Global.User.value == "") {
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
        if (Global.User.value == "") {
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
            if (Global.User.value != "") {
              axios
                .post("api/UseFrequency.php", {
                  user: Global.User.value,
                  kay: localStorage.getItem("kay"),
                })
                .then((response) => {
                  const cod = response.data.cod;
                  const info = response.data.info;
                  if (cod == "103") {
                    PaperCard.sendInfo.value = response.data.send;
                  } else {
                    alert(info);
                  }
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
          beforeEnter(to, form, next) {
            if (Global.User.value != "") {
              //初始化获取数据
              axios
                .post("api/MyPaperCard.php", {
                  user: Global.User.value,
                  kay: localStorage.getItem("kay"),
                  page: 1,
                })
                .then((response) => {
                  const cod = response.data.cod;
                  const info = response.data.info;
                  if (cod == "103") {
                    Global.card.value = response.data.card;
                    if (Global.Pagenumber.value == "") {
                      Global.Pagenumber.value = response.data.number;
                    }
                  } else {
                    alert(info);
                  }
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
            if (Global.User.value != "") {
              axios
                .post("api/UseFrequency.php", {
                  user: Global.User.value,
                  kay: localStorage.getItem("kay"),
                })
                .then((response) => {
                  const cod = response.data.cod;
                  const info = response.data.info;
                  if (cod == "103") {
                    CollectCards.AcceptCard.value = response.data.accept;
                  } else {
                    alert(info);
                  }
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
          path: "MyseeCard",
          component: MyseeCard,
          beforeEnter(to, form, next) {
            if (Global.User.value != "") {
              axios
                .post("api/MySeeCard.php", {
                  user: Global.User.value,
                  kay: localStorage.getItem("kay"),
                  page: 1,
                })
                .then((response) => {
                  const cod = response.data.cod;
                  const info = response.data.info;
                  console.log(response.data);
                  if (cod == "103") {
                    Global.card.value = response.data.card;
                    if (Global.Pagenumber.value == "") {
                      Global.Pagenumber.value = response.data.number;
                    }
                  } else {
                    alert(info);
                  }
                })
                .catch((response) => {
                  console.log("API获取失败");
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
        if (Global.User.value != "") {
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
            if (Global.User.value != "") {
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
            if (Global.User.value != "") {
              next();
            } else {
              alert("你还没登录呢");
            }
          },
        },
      ],
    },
  ],
});
export default router;
