import Mock from 'mockjs';

let moke = [
  {
    area: Mock.mock('/area', 'get', {
      'list|1-10': [{ //生成数据规则
        'name': '@province',
        'code': '0123',
        'dimension': '13.232422',
        'longitude': '23.323223',
      }]
    }),
    device:Mock.mock('/device', 'get', {
      'list|1-10': [{ //生成数据规则
        'deviceName': '@name',
        'deviceEIMI': '0123',
        'deviceType': '分类1',
        'commAddress': '192.168.1.181',
        'location' :'@province',
        'installAddress':'华瑞中心2号楼',
        'dimension': '13.232422',
        'longitude': '23.323223',
        'note' :'备注'
      }]
    }),
  },
]

export default moke