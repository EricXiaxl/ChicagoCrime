import React, {useEffect, useRef, useState} from "react";
import {useTheme} from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    List,
    ListItem, ListItemText, CssBaseline
} from '@material-ui/core';
import echarts from 'echarts';
import 'echarts/map/js/province/tianjin';
import {AllData, geoCoordMap} from "./AllData";
import Map from "./Map"

export default function () {
    const theme = useTheme();
    const chartRef = useRef();
    const mapRef = useRef();
    let chartInstance;
    let mapInstance;
    let [clientHeight, setClientHeight] = useState(0)
    let [data, setData] = useState(AllData[0].BtoDataList)
    let [oneData,setOneData] = useState(AllData[0])

    var max = 480, min = 9; //todo
    var maxSize4Pin = 100, minSize4Pin = 20;

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i< data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    /*function renderMap(){
        const renderedInstance = echarts.getInstanceByDom(mapRef.current)
        if (renderedInstance) {
            mapInstance = renderedInstance
        } else {
            mapInstance = echarts.init(mapRef.current)
        }
        mapInstance.setOption({
            title: {
                text: `"2019XXX" - ${oneData.BigCode}`,
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#98a9b4'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (typeof(params.value)[2] == "undefined"){
                        return params.name;
                    }else {
                        return params.name + ' : ' + params.value[2] + ' 吨';
                    }
                }
            },
            // legend: {
            //     orient: 'vertical',
            //     y: 'bottom',
            //     x: 'right',
            //     data: ['credit_pm2.5'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            visualMap: {
                show: false,
                min: 0,
                max: 500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],   //文本， 默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    color: ['#0f0c29', '#302b63', '#24243e']
                }
            },
            geo: {
                show: true,
                map: '天津',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                }
            },
            series: [
                {
                    name: 'credit_pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#05C3F9'
                        }
                    }
                },
                {
                    type: 'map',
                    map: '天津',
                    geoIndex: 0,
                    aspectScale: 0.75,  //长宽比
                    showLegendSymbol: false,    //存在legend时显示
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077'
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: function (val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a*min;
                        b = maxSize4Pin - a*max;
                        return a*val[2] + b;
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            },
                            formatter:function (data) {
                                return data.value[2] + '吨'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F62157', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 5)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#05C3F9',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                },
            ]
        })
    }*/

    function renderChart(xData, yData){
        const renderedInstance = echarts.getInstanceByDom(chartRef.current)
        if (renderedInstance) {
            chartInstance = renderedInstance
        } else {
            chartInstance = echarts.init(chartRef.current)
        }
        chartInstance.setOption({
            title: {
                text: 'Avenue: ' + `${oneData.BigCode} \n Top 5 Crime Types`,
                x: 'center',
                textStyle: {
                    color: '#98a9b4',
                    fontSize: '15'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                name: 'Type',
                data: xData,
                axisLine:{
                    lineStyle: {
                        color:'#98a9b4'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: '9'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: 'Amount',
                axisLabel:{
                    formatter:'{value}'
                },
                axisLine:{
                    lineStyle:{
                        color:'#98a9b4'
                    }
                }
            },
            series: [{
                name: 'Amount',
                data: yData,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                },
                itemStyle: {
                    normal: {
                        color:'#F62157',
                        label: {
                            show: true,
                            // position: 'top',
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        }
                    }
                }
            }]
        })
    }

    useEffect(() => {
        let xData = []
        let yData = []
        for (let i = 0; i < oneData.nameDataList.length; i++) {
            xData.push(oneData.nameDataList[i].name)
            yData.push(oneData.nameDataList[i].value)
        }
        renderChart(xData, yData)
        // renderMap()
        // setClientHeight(mapRef.current.clientHeight)
        setClientHeight(700)
    }, [data])

    useEffect(() => {
        return () => {
            chartInstance && chartInstance.dispose()
            // mapInstance && mapInstance.dispose()
        }
    }, [])

    const changeHandle = (item) => {
        setData(item.BtoDataList)
        setOneData(item)
    }

    return (
        <div style={{backgroundColor:theme.palette.background, flexGrow:1, padding:18}}>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper elevation={3} style={{overflowY:'auto', height:clientHeight}}>
                        <div style={{textAlign:'center', color:'#98a9b4', fontSize:'19px', fontWeight:'bold'}}>Top 15 Crime Avenue (Chicago)</div>
                        <List>
                            {
                                AllData.map((item,index)=>(
                                    <ListItem
                                        button
                                        selected={item.BigCode === oneData.BigCode}
                                        key={index}
                                        onClick={(e)=>{changeHandle(item)}}
                                    >
                                        <ListItemText primary={item.BigCode} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={3}>
                        <div style={{width: "100%", height: 700}}>
                            <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}&language=en-US`}
                                        loadingElement={<div style={{ height:"100%" }} />}
                                        containerElement={<div style={{ height:"100%" }} />}
                                        mapElement={<div style={{ height:"100%" }} />}
                            />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper elevation={3}>
                        <div style={{width:'100%', height:700}} id="z" ref={chartRef}></div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
