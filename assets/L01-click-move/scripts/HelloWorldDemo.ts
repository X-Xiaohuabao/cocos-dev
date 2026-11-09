import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * L1-1 讲解示例:第一个自定义组件
 * 挂到节点上后,它就成了该节点的"功能挂件"
 */
@ccclass('HelloWorldDemo')
export class HelloWorldDemo extends Component {

    @property({ displayName: '问候语', tooltip: '会打印到控制台' })
    greeting: string = '你好,我是你的第一个脚本组件!';

    /** 生命周期:场景启动时引擎自动调用(L1-2 细讲) */
    start() {
        this.sayHello();
    }

    /** 公开方法:编辑器或其他脚本也能调用 */
    sayHello() {
        console.log(`[${this.node.name}] ${this.greeting}`);
    }
}
