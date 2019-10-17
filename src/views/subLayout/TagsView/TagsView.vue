<template>
  <div id="tagsview">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        ref="tag"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        :to="tag"
        @contextmenu.prevent.native="openMenu(tag,$event)"
        v-for="tag in Array.from(visitedViews)"
        :key="tag.path"
      >
        {{tag.title}}
        <span
          class="el-icon-close"
          v-if="!tag.affix"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane';
import path from 'path';

export default {
    name: 'TagsView',
    components: { ScrollPane },

    data () {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {}
        };
    },
    computed: {
        visitedViews () {
            return this.$store.state.tagsView.visitedViews;
        }
    },
    watch: {
        $route (to, from) {
            this.addViewTags();
            // this.moveToCurrentTag();
        },
        visible (value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu);
            } else {
                document.body.removeEventListener('click', this.closeMenu);
            }
        }
    },
    mounted () {
    // console.log("this.visitedViews", this.visitedViews);
        this.addViewTags();
    },

    methods: {
        isActive (route) {
            return route.path === this.$route.path;
        },
        generateRoute () {
            if (this.$route.name) {
                return this.$route;
            }
            return false;
        },
        addViewTags () {
            const route = this.generateRoute();
            // console.log("addViewTags", route);
            if (!route) {
                return false;
            }
            this.$store.dispatch('addVisitedViews', route);
        },
        moveToCurrentTag () {
            const tags = this.$refs.tag;
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag.$el);
                        break;
                    }
                }
            });
        },
        closeSelectedTag (view) {
            this.$store.dispatch('delVisitedViews', view).then(views => {
                if (this.isActive(view)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                        this.$router.push(latestView);
                    } else {
                        this.$router.push('/');
                    }
                }
            });
        },
        closeOthersTags () {
            this.$router.push(this.selectedTag);
            this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
                this.moveToCurrentTag();
            });
        },
        closeAllTags () {
            this.$store.dispatch('delAllViews');
            this.$router.push('/');
        },
        openMenu (tag, e) {
            this.visible = true;
            this.selectedTag = tag;
            const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
            this.left = e.clientX - offsetLeft + 15; // 15: margin right
            this.top = e.clientY;
        },
        closeMenu () {
            this.visible = false;
        },
    }
};
</script>

<style lang='scss' scope>
#tagsview {
  height: 30px;
  width: 100%;
  background-color: #fff;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  padding-left: 8px;
  .el-scrollbar__wrap {
    overflow-y: hidden;
    overflow-x: scroll;
    height: auto;
   
  }
 
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 28px;
      line-height: 28px;
      // border: 1px solid #303030;
      color: rgb(48,49,51);
      background: rgb(247, 248, 250);
      padding: 0 28px;
      font-size: 14px;
      // margin-left: 5px;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: rgb(45, 134, 225);
        color: #fff;
        // border-color: #46464B;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .el-scrollbar__view {
    height: 100%;
    background-color: #fff;
    span {
      // color: #000;
      z-index: 999;
    }
  }
  .tags-view-item {
    .el-icon-close {
      width: 13px;
      height: 13px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}

</style>
