import { ElMessageBox } from "element-plus";
const server_err = () => {
  ElMessageBox.alert(
    `期待搜索服务器返回0, 但是服务器返回了其他值. 服务器部署错误?`,
    "遇到了错误 :("
  );
};

export { server_err };
