import Mock from 'mockjs';
import MockAdapter from 'axios-mock-adapter';
import {axios,$utils} from 'helper';
let mock = new MockAdapter(axios);
let xAxias1=[],xAxias2=[],yAxias1={
  M1:{
    type:'',
    data:[]
  },
  M2:{
    type:'',
    data:[]
  },
  M3:{
    type:'',
    data:[]
  }
},yAxias2={
  M1:{
    type:'',
    data:[]
  },
  M2:{
    type:'',
    data:[]
  },
  M3:{
    type:'',
    data:[]
  }
},table=[]
for (let i = 0; i < 20; i++) {
  xAxias1.push(Mock.mock(Mock.Random.date()));
  // yAxias1['M1'].type='line'
  // yAxias1['M2'].type='line'
  // yAxias1['M3'].type='bar'
  yAxias1['M1'].data.push(i*Mock.Random.integer(0, 1)*2)
  yAxias1['M2'].data.push(i*Mock.Random.integer(0, 1)*2)
  yAxias1['M3'].data.push(i*Mock.Random.integer(0, 1)*2)
}
for (let i = 0; i < 20; i++) {
  xAxias2.push(Mock.mock(Mock.Random.date()));
  // yAxias2['M1'].type='line'
  // yAxias2['M2'].type='line'
  // yAxias2['M3'].type='bar'
  yAxias2['M1'].data.push(i*Mock.Random.integer(0, 1))
  yAxias2['M2'].data.push(i*Mock.Random.integer(0, 1))
  yAxias2['M3'].data.push(i*Mock.Random.integer(0, 1))
}
for (let j=1;j<4;j++){
  table.push({
    name:'M'+j,
    min:30*Mock.Random.integer(0, 1),
    max:60*Mock.Random.integer(0, 1),
    type:1
  })
}

let nameList = ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M81','M91','M82','M92'];
let json = [
  {value:30,name:'M1'},
  {value:26,name:'M2'},
  {value:24,name:'M3'},
  {value:30,name:'M4'},
  {value:26,name:'M5'},
  {value:24,name:'M6'},
  {value:30,name:'M7'},
  {value:26,name:'M8'},
  {value:24,name:'M9'},
  {value:26,name:'M81'},
  {value:24,name:'M91'},
  {value:26,name:'M82'},
  {value:24,name:'M92'},
];



export default{
  bootstrap() {
    let mock = new MockAdapter(axios);
    mock.onGet('/getM2').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            content: {
              nameList: nameList,
              json: json
            }
          }]);
        }, 200);
      });
    })
    mock.onGet('/getM3').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            content: {
              nameList: nameList,
              json: json
            }
          }]);
        }, 200);
      });
    })
    mock.onGet('/getM1').reply(config => {
      if( config.params.timeWithQuick && config.params.changeData){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              content: {
                xAxias:xAxias2,
                yAxias:yAxias2,
                table:table,
                allLegends:['M1','M2','M3'],
                showLegends:['M1','M3'],
              }
            }]);
          }, 200);
        });
      }else{
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              content: {
                xAxias:xAxias1,
                yAxias:yAxias1,
                table:table,
                allLegends:['M1','M2','M3'],
                showLegends:['M1','M3'],
              }
            }]);
          }, 200);
        });
      }

    });
  }

}

