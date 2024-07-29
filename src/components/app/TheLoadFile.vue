<template>
  <form
    enctype="multipart/form-data"
    novalidate
    class="
      d-flex
      justify-center
      align-center
      parent-loader
      flex-column
      w-full
      pa-8
    "
    :class="{ active: drag }"
    @dragover="drag = true"
  >
    <p style="color: var(--v-notification-base)">Перетащите файлы сюда</p>
    <div
      class="
        content-image
        d-flex
        justify-center
        align-center
        flex-wrap
        w-full
        overflow-x-hidden
      "
    >
      <template v-for="(file, i) in files">
        <div
          :key="i"
          class="
            image-item
            d-flex
            justify-center
            align-center
            flex-column
            w-1/3
            pa-2
          "
          :title="file.name"
          :class="{ load: file.load }"
        >
          <svg
            v-if="file.load"
            class="loader"
            width="4rem"
            height="4rem"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke-width="10"
              r="35"
              stroke-dasharray="164.93361431346415 56.97787143782138"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              />
            </circle>
          </svg>
          <div class="cursor-pointer close" @click.stop="deleteMe(i)">
            <v-icon>mdi-close-circle</v-icon>
          </div>
          <img :src="file.file" />
          <div class="d-flex justify-space-between w-full">
            <span class="text-truncate w-full">{{ file.name }}</span>
            <span>{{ getSize(file.size) }}</span>
          </div>
        </div>
      </template>
    </div>
    <input
      ref="file"
      type="file"
      :accept="accept"
      :class="{ 'd-none': !drag }"
      :multiple="multiple"
      @dragleave="drag = false"
      @change="getFile"
    />
    <v-btn class="elevation-base" color="#F3F3F3" @click="$refs.file.click()">
      Искать в файлах
    </v-btn>
  </form>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: "image/*",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      files: [],
      drag: false,
    }
  },
  methods: {
    getSize(size) {
      let sizeN = 0
      if (size >= 1024000) {
        while (size >= 1024000) {
          size -= 1024000
          sizeN++
        }
        size = size + ""
        sizeN += "." + size[0] + size[1]
        sizeN += "Mb"
      } else {
        while (size >= 1024) {
          size -= 1024
          sizeN++
        }
        size = size + ""
        sizeN += "." + size[0] + size[1]
        sizeN += "Kb"
      }
      return sizeN
    },
    deleteMe(index) {
      this.files.splice(index, 1)
    },
    getFile(e) {
      this.drag = false
      Array.from(e.target.files).forEach((x) => {
        if (this.multiple)
          this.files.push({
            file: URL.createObjectURL(x),
            name: x.name,
            size: x.size,
            load: true,
          })
        else
          this.files = [
            {
              file: URL.createObjectURL(x),
              name: x.name,
              size: x.size,
              load: true,
            },
          ]
      })
      this.files.forEach(async (x) => {
        x.file = await this.sendFile(x.file)
        x.load = false
      })
    },
    sendFile(file) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(file)
        }, 2000)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.parent-loader {
  height: 100%;
  width: 100%;
  border: 1px dashed #000000;
  border-radius: 8px;
  &.active {
    background: rgba(123, 202, 200, 0.12);
  }
}
.content-image {
  max-height: 80%;
  overflow: auto;
}
.load {
  & > img {
    filter: blur(3px);
  }
}
.loader {
  position: absolute;
  z-index: 2;
  & > circle {
    stroke: var(--v-primary-base);
  }
}
.image-item {
  position: relative;
  & > img {
    width: 100%;
  }
  &:hover {
    & .close {
      display: flex;
    }
  }
  & .close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    display: none;
    z-index: 1;
  }
}
input {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  &.d-none {
    height: 0%;
    width: 0%;
  }
}
</style>
