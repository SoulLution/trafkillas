import Vue from "vue"
import VueMask from "v-mask"
import localize from "@/filters/localize"
import moment from "moment"
import VueApexCharts from "vue-apexcharts"

import axios from "axios"

axios.defaults.baseURL = "https://dev.tkillas.com/api/v1/"
Vue.prototype.$axios = axios

import "quill/dist/quill.snow.css"
import { quillEditor } from "vue-quill-editor"

Vue.component("QuillEditor", quillEditor)
Vue.component("TheDatePicker", () =>
  import("@/components/date-picker/TheDatePicker")
)
Vue.component("TheInputDate", () =>
  import("@/components/date-picker/TheInputDate")
)

Vue.component("StaticSubtext", () =>
  import("@/components/app/typography/StaticSubtext")
)
Vue.component("StaticText", () =>
  import("@/components/app/typography/StaticText")
)
Vue.component("StaticTitle", () =>
  import("@/components/app/typography/StaticTitle")
)

Vue.component("ViewTable", () => import("@/components/app/tables/ViewTable"))
Vue.component("EditTable", () => import("@/components/app/tables/EditTable"))

Vue.component("TheExcelDateTable", () =>
  import("@/components/app/TheExcelDateTable")
)
Vue.component("TheBrand", () => import("@/components/app/TheBrand"))
Vue.component("Container", () => import("@/components/app/grids/Container"))
Vue.component("TheTreeview", () => import("@/components/app/TheTreeview"))
Vue.component("TheTreenode", () => import("@/components/app/TheTreenode"))
Vue.component("TheTooltipMenu", () => import("@/components/app/TheTooltipMenu"))
Vue.component("ListItems", () => import("@/components/app/ListItems"))
Vue.component("ListGroupItems", () => import("@/components/app/ListGroupItems"))

Vue.component("TheAutocomplete", () =>
  import("@/components/app/TheAutocomplete")
)

Vue.component("TheTextarea", () => import("@/components/textarea/TheTextarea"))
Vue.component("ProfileAvatar", () => import("@/components/app/ProfileAvatar"))
Vue.component("ProfileAvatarList", () =>
  import("@/components/app/ProfileAvatarList")
)

Vue.component("ScrollShadowElement", () =>
  import("@/components/app/grids/ScrollShadowElement")
)
Vue.component("Auxilarium", () => import("@/components/app/grids/Auxilarium"))
Vue.component("SubNavigation", () =>
  import("@/components/app/grids/SubNavigation")
)
Vue.component("DetailElement", () =>
  import("@/components/app/grids/DetailElement")
)
Vue.component("MasterElement", () =>
  import("@/components/app/grids/MasterElement")
)
Vue.component("ToolbarElement", () =>
  import("@/components/app/grids/ToolbarElement")
)
Vue.component("ExpandedElement", () =>
  import("@/components/app/grids/ExpandedElement")
)

Vue.component("ConfirmDialog", () =>
  import("@/components/app/ConfirmDialog.vue")
)

Vue.component("NoData", () => import("@/components/app/NoData"))
Vue.component("TheLoading", () => import("@/components/app/TheLoading"))
Vue.component("TheLoadFile", () => import("@/components/app/TheLoadFile"))

Vue.use(VueMask)
import { VueMaskFilter } from "v-mask"
Vue.filter("VMask", VueMaskFilter)

Vue.use(VueApexCharts)
Vue.component("Apexchart", VueApexCharts)

Vue.prototype.$moment = moment
Vue.prototype.$localize = localize
Vue.prototype.$fetch = fetch

import slugify from "slugify"
Vue.prototype.$slugify = slugify

Vue.prototype.$searchInItems = (item, text, predicate) => {
  let end = false
  if (~item[text].toLowerCase().indexOf(predicate.toLowerCase() + "")) {
    item[text + "_real"] =
      "<span>" +
      item[text]
        .toLowerCase()
        .split(predicate.toLowerCase() + "")
        .join(
          `</span><span style="background-color: #F4EA51">${
            predicate.toLowerCase() + ""
          }</span><span>`
        ) +
      "</span>"
    end = true
  } else item[text + "_real"] = item[text]
  return end
}

Vue.directive("scroll-table", {
  inserted: (el, binding) => {
    let f = function (e) {
      if (this.loading) return
      if (
        e.target.scrollTop >=
        (e.target.scrollHeight - e.target.offsetHeight) * 0.9
      ) {
        binding.value(e, el)
      }
    }
    el.children[0].addEventListener("scroll", f)
  },
})

Vue.directive("inited", {
  inserted: (el, binding) => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        binding.value({
          height: entry.borderBoxSize[0].blockSize,
          type: "updated",
        })
      }
    })
    resizeObserver.observe(el)
    binding.value({ height: el.clientHeight, type: "inited" })
  },
})

Vue.prototype.$setGray = (e) => {
  var r = document.querySelector(":root")
  localStorage.setItem(":root--v-bg-base", e)
  r.style.setProperty("--v-bg-base", e)
}

Vue.prototype.$toBase64 = async (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

Vue.prototype.$fromBase64 = (b64Data, contentType, sliceSize) => {
  contentType = contentType || ""
  sliceSize = sliceSize || 512

  var byteCharacters = atob(
    b64Data.includes("base64,") ? b64Data.split("base64,")[1] : b64Data
  )
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new File(byteArrays, "pot", { type: contentType })
}

const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  }

  if (obj.constructor && obj.constructor !== Object) {
    const newObj = Object.create(Object.getPrototypeOf(obj))
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }

  const objCopy = {}
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepClone(obj[key])
    }
  }
  return objCopy
}
Vue.prototype.$deepClone = deepClone
