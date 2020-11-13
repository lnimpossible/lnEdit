require("@/plugin/jscolor.js")
import '@/styles/index.scss';
const wid: any = window
const actionbar = document.getElementById("header")

const exec = (command: any, value: any = null) => {
  document.execCommand(command, false, value);
};
const actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: () => exec('bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: () => exec('italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: () => exec('underline')
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: () => {
      const url = window.prompt('Enter the link URL')
      if (url) exec('createLink', url)
    }
  },
  color: {
    icon: '<button id="colorButton" />',
    title: 'color',
    result: (e: any) => {
      console.log(e)
      // exec('foreColor', 'red')
    }
  }
  // …
}
for (let k in actions) {
  // @ts-ignore
  const v: any = actions[k];
  // 新建一个按钮元素
  const button = document.createElement('button')
  // 给按钮加上 css 样式
  button.className = 'item'
  // 把 icon 属性作为内容显示出来
  button.innerHTML = v.icon
  button.title = v.title
  // 把 result 属性赋给按钮作为点击事件
  button.onclick = v.result
  // 将创建的按钮添加到工具栏上
  actionbar.appendChild(button)
}
var myPicker = new wid.jscolor('#colorButton', {
  onChange: function (e: any) {
    const rgba: string = this.toRGBAString()
    exec('foreColor', rgba)
  }
})