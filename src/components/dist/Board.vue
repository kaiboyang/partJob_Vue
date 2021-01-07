<style></style>
<template>
  <div>
    <comment />
    <addComment />
  </div>
</template>

<script>
import comment from "../boardInner/Comment";
import addComment from "../boardInner/AddComment";
export default {
  components: {
    comment,
    addComment,
  },
  data() {
    return {};
  },
};
</script>
