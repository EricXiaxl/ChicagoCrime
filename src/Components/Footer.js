import React from "react";
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
   Footer:{
       position:"fixed",
       bottom:0,
       backgroundColor:theme.palette.success.main,
       width:'100%',
       color:'#fff',
       display:'flex',
       justifyContent:'center',
       fontSize:'19px',
       fontWeight:'bold'
   }
}))

export default ()=>
    <div className={styles().Footer}>
        @CA675 Assignment2
    </div>
