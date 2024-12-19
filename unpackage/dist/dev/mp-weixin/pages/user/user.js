"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = ref({});
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.userinfo
      }, _ctx.userinfo ? common_vendor.e({
        b: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        c: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        d: common_assets._imports_0,
        e: common_vendor.t(common_vendor.unref(userInfo).IP),
        f: common_vendor.t(common_vendor.unref(userInfo).address.city || common_vendor.unref(userInfo).address.province || common_vendor.unref(userInfo).address.address)
      } : {}, {
        g: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "$brand-theme-color"
        }),
        h: common_vendor.t(common_vendor.unref(userInfo).downloadSize),
        i: common_vendor.p({
          type: "right",
          size: "15"
        }),
        j: common_vendor.p({
          type: "star-filled",
          size: "20",
          color: "$brand-theme-color"
        }),
        k: common_vendor.t(common_vendor.unref(userInfo).scoreSize),
        l: common_vendor.p({
          type: "right",
          size: "15"
        }),
        m: common_vendor.p({
          type: "chatboxes-filled",
          size: "20",
          color: "$brand-theme-color"
        }),
        n: common_vendor.p({
          type: "right",
          size: "15"
        }),
        o: common_vendor.p({
          type: "notification-filled",
          size: "20",
          color: "$brand-theme-color"
        }),
        p: common_vendor.p({
          type: "right",
          size: "15"
        }),
        q: common_vendor.p({
          type: "flag-filled",
          size: "20",
          color: "$brand-theme-color"
        }),
        r: common_vendor.p({
          type: "right",
          size: "15"
        })
      }) : {
        s: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        t: common_vendor.p({
          status: _ctx.more
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
