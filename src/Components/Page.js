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
import {AllData} from "./AllData";
import Map from "./Map"

export default function () {
    const theme = useTheme();
    const chartRef = useRef();
    let chartInstance;
    let [clientHeight, setClientHeight] = useState(0)
    // let [data, setData] = useState(AllData[0].BtoDataList)
    let [oneData,setOneData] = useState(AllData[0])

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
    }, [])

    useEffect(() => {
        return () => {
            chartInstance && chartInstance.dispose()
            // mapInstance && mapInstance.dispose()
        }
    }, [])

    const changeHandle = (item) => {
        // setData(item.BtoDataList)
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
