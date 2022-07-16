import './App.css';
import React, { Component} from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid, esES, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add';
let nombre = "";
let defensa = null;
let ataque = null;
let nombre1 = "";
let defensa1 = null;
let ataque1 = null;
let image = "";
const handleClick = (event, cellValues) => {

  Swal.fire({
    title: 'Eliminar',
    text: `${cellValues.row.name}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4844B9',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch('https://bp-pokemons.herokuapp.com/' + cellValues.row.id, { method: 'DELETE' })
        .then(() => this.setState({ status: 'Delete successful' }));

      setTimeout(function () {
        window.location.reload(1);
      }, 1000);
    }
  })
}

const handleClick1 = (event, cellValues) => {

  Swal.fire({
    width: "600px",
    title: "Editar Pokemon",
    html: '<h5 style="text-align:left;">Nombre: </h5>' +
      `<input id="nombre" class="swal2-input" type="text"autofocus placeholder="Nombre" value="${cellValues.row.name}" style="display:block; margin-top:-1px">` +
      '<h5 style="text-align:left;">Ataque: </h5>' +
      `<input id="ataque" class="swal2-input" autofocus placeholder="" value="${cellValues.row.attack}" style="display:block; margin-top:-1px">` +
      '<h5 style="text-align:left;">Defensa: </h5>' +
      `<input id="defensa" class="swal2-input" autofocus placeholder="" value="${cellValues.row.defense}" style="display:block; margin-top:-1px">`,

    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: '#4844B9',
    cancelButtonText: "Cancelar",

  }).then((result) => {
    if (result.isConfirmed) {
      nombre = document.getElementById('nombre').value;
      ataque = document.getElementById('ataque').value;
      defensa = document.getElementById('defensa').value;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cellValues.row.id,
          name: nombre,
          image: cellValues.row.image,
          attack: ataque,
          defense: defensa,
          hp: cellValues.row.hp,
          type: cellValues.row.type,
          idAuthor: 1
        })
      };
      fetch('https://bp-pokemons.herokuapp.com/' + cellValues.row.id + '?idAuthor=1', requestOptions)
        .then(response => response.json())

      setTimeout(function () {
        window.location.reload(1);
      }, 1000);
    }
  })

}
const handleClick2 = (event) => {
  nombre1 = document.getElementById('nombre1').value;
  image = document.getElementById('image').value;
  if (nombre1 !== "" && image !== "" && ataque1 !== null && defensa1 !== null) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nombre1,
        image: image,
        attack: ataque1,
        defense: defensa1,
        idAuthor: 1,
        hp: Math.floor(Math.random() * (100 - 20 + 1) + 20),
        type: "Nuevo  ",
      })
    };
    fetch('https://bp-pokemons.herokuapp.com/?idAuthor=1', requestOptions)
      .then(response => response.json())

    setTimeout(function () {
      window.location.reload(1);
    }, 1000);

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Campos Incompletos'
    })
  }
}

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    ><div style={{ heigth: "10px", marginLeft: "10px" }}><h3><b>Listado de Pokemon</b></h3></div>

      <GridToolbarQuickFilter  />
      <br />
      <br />


    </Box>

  );
}
const columns = [
  {
    field: 'id', headerName: 'ID', width: 60, headerClassName: 'super-app-theme--header', hide: true
  },
  {
    field: 'name', headerName: 'Nombre', width: 170, headerClassName: 'super-app-theme--header'
  },
  {
    field: 'im', headerName: 'Imagen', headerClassName: 'super-app-theme--header', width: 120,
    renderCell: (params) => {
      return (
        <img src={params.row.image} width="60" height="60" alt="Imagen del pokemon" style={{ marginLeft: '1px' }} />

      )
    }
  },
  {
    field: 'attack', headerName: 'Ataque', headerClassName: 'super-app-theme--header', width: 170
  },
  {
    field: 'defense', headerName: 'Defensa', headerClassName: 'super-app-theme--header', width: 120,

  },
  {
    field: 'acciones  ', headerName: 'Acciones', headerClassName: 'super-app-theme--header', width: 170,
    renderCell: (cellValues) => {
      return (
        <div>
          <Button style={{ backgroundColor: "transparent", color: "grey" }}
            onClick={(event) => {
              handleClick1(event, cellValues);
            }}>
            <EditIcon />
          </Button>
          <Button style={{ backgroundColor: "transparent", color: "grey" }}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}>
            <DeleteIcon />
          </Button>
        </div>
      )

    }
  },


]
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      datos: [],
      hide: false
    }

  }


  componentDidMount() {
    fetch('https://bp-pokemons.herokuapp.com/?idAuthor=1', {
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ datos: response })
      })
  }

  operation() {
    this.setState({
      hide: true
    })
  }
  operation1() {
    this.setState({
      hide: false
    })
  }
  render() {

    return (
      <div>
        <div style={{ backgroundColor: "grey", heigth: "20px" }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" width="90" height="40" alt="Imagen Navbar" />
        </div>
        <Grid container spacing={2} direction="column"
          alignItems="center"
          justifyContent="center">
          <Grid item xs={5} md={4} >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 2,
                  width: 898,
                  height: 383,
                },
              }}
            >
              <Paper elevation={1}>
                <Button style={{
                  float: 'right',
                  backgroundColor: "#4844B9",
                  padding: "11px 25px",
                  fontSize: "12px", marginLeft: "780px", position: "absolute", zIndex: "999", marginTop: "60px"
                }} variant="contained" onClick={() => this.operation()}><AddIcon fontSize='small' /> Nuevo</Button>
                <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                  rows={this.state.datos}
                  columns={columns}
                  pageSize={3}
                  disableSelectionOnClick
                  rowLength={10}
                  autoHeight
                  autoWidth
                  autoPageSize
                  columnResize
                  components={{ Toolbar: QuickSearchToolbar }}

                /></Paper>
            </Box>
          </Grid>
        </Grid>
        {
          this.state.hide ?
            <Grid container spacing={2} direction="column"
              alignItems="center"
              justifyContent="center" style={{ marginTop: "-25px" }}>
              <Grid item xs={5} md={4} >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 2,
                      width: 898,
                      height: 160,
                    },
                  }}
                >
                  <Paper elevation={5}>

                    <h4 style={{ textAlign: "center" }}>Nuevo Pokemon</h4>
                    <h5 style={{ marginLeft: "30px" }}>Nombre: <input id="nombre1" type="text" style={{ marginLeft: "30px", marginTop: "-135px" }}></input></h5>

                    <h5 style={{ marginLeft: "30px" }}>Imagen: <input id="image" type="text" style={{ marginLeft: "33px" }}></input></h5>
                    <div style={{ margin: "auto", display: "flex", marginLeft: "570px", marginTop: "-85px" }}>
                      <h5 style={{ marginTop: "-10px" }}>Ataque: </h5><br></br>
                      <Slider id="ataque1" defaultValue={50} aria-label="Default" valueLabelDisplay="auto" style={{ width: "200px", marginTop: "-15px", marginLeft: "10px" }}
                        onChange={(event, value) => ataque1 = value} />
                      <h5 style={{ marginTop: "40px", marginLeft: "-260px" }}>Defensa: </h5><br></br>
                      <Slider id="defensa1" defaultValue={50} aria-label="Default" valueLabelDisplay="auto" style={{ width: "200px", marginTop: "35px", marginLeft: "6px" }}
                        onChange={(event, valuer) => defensa1 = valuer} />
                    </div>
                    <Button style={{
                      backgroundColor: "#D61C0D",
                      padding: "5px 15px",
                      fontSize: "12px", marginLeft: "430px", marginTop: "-35px"
                    }} variant="contained" onClick={() => this.operation1()}>X Cancelar</Button>
                    <Button style={{
                      backgroundColor: "#4844B9",
                      padding: "5px 15px",
                      fontSize: "12px", marginLeft: "330px", marginTop: "-76px"
                    }} variant="contained" onClick={(event) => {
                      handleClick2(event);
                    }} >Guardar</Button>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            : null
        }
      </div>
    )
  }
}