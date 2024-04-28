import Mock from 'mockjs'
import floor from './floor.json'
import slide from './slide.json'

//Mock.mock(拦截哪个地址，方式，模拟的内容)
Mock.mock('http://wwww.xiaogang/slide','get',
{
    code:200,
    message:"成功",
    ok:true,
    data:slide})

    Mock.mock('http://wwww.xiaogang/floor','get',
{
    code:200,
    message:"成功",
    ok:true,
    data:floor})