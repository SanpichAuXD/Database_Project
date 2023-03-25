<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
</head>
<style>
    * {
        font-family: 'Kanit', sans-serif;
    }

    .btn {
        background-color: #DDB892;
        font-size: 1.3vw;
        color: white
    }

    .btn:hover {
        background-color: #B88A64;
        color: white;
    }

    th,
    td {
        vertical-align: middle;
    }
</style>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="text" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
    <div class="container p-5">
        <!-- Content here -->
        <section class="d-flex justify-content-center">
            <div class="input-group rounded mb-5 w-75">
                <input type="search"  id="searchInput" onkeyup="myFunction()" class="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" />
                <button id="search-button" type="button" class="btn">
                    <i class="bi bi-search pe-2"></i>Search
                </button>
            </div>
        </section>

        <div class="d-flex justify-content-center align-item-center">
            <table id="probTable" class="table table-hover">
                <thead style="background-color: #B88A64; color:white; border-radius:15px; font-size:1.3vw">
                    <tr class="rounded">
                        <th scope="col" class="px-3">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Type</th>
                        <th scope="col" colspan="2">Email</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody style="font-size:1.2vw;">
                    <tr>
                        <th scope="row">17</th>
                        <td>Mark1</td>
                        <td>Deserted Area</td>
                        <td colspan="2">mark@mail.com</td>
                        <td>22/3/2023</td>
                        <td>Area 52</td>
                        <td><!-- Button trigger modal -->
                            <button type="button" class="btn"
                                style="background-color: #DDB892; font-size:1.3vw; color:white" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                View Detail
                            </button>
                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Detail</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h2>Prob title</h2>
                                            <div class="mb-3">
                                                <label class="form-label">Detail 1</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    value="sdaasdad" disabled>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Detail 2</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    value="sdaasdad" disabled>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Detail 3</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    value="sdaasdad" disabled>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlTextarea1" class="form-label">Example
                                                    textarea</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                    disabled>sadasdasdasdasdasdasdadsasdasd</textarea>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <select class="form-select" aria-label="Default select example">

                                <option value="Pending">Pending</option>
                                <option value="Success">Success</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">17</th>
                        <td>Test</td>
                        <td>Deserted Eagle</td>
                        <td colspan="2">mark@mail.com</td>
                        <td>22/3/2023</td>
                        <td>KMITL</td>
                        <td><!-- Button trigger modal -->
                            <button type="button" class="btn" style="font-size:1.3vw" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                View Detail
                            </button>
                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Detail</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h2>Prob title</h2>
                                            <div class="mb-3">
                                                <label class="form-label">Detail 1</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    value="sdaasdad" disabled>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Detail 2</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    value="sdaasdad" disabled>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Detail 3</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    value="sdaasdad" disabled>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlTextarea1" class="form-label">Example
                                                    textarea</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1"
                                                    rows="3">sadasdasdasdasdasdasdadsasdasd</textarea>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <select class="form-select" aria-label="Default select example">

                                <option value="Pending">Pending</option>
                                <option value="Success">Success</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </td>
                    </tr>
                    <?php
                    include('tr.php')
                        ?>
                   
                </tbody>
            </table>
        </div>
    </div>

</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
    crossorigin="anonymous"></script>
<script>
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("probTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    nametd = tr[i].getElementsByTagName("td")[0];
    typetd = tr[i].getElementsByTagName("td")[1];
    locatd = tr[i].getElementsByTagName("td")[4];
    console.log(nametd)
    if (nametd || typetd || locatd) {
      nameValue = nametd.textContent || nametd.innerText;
      typeValue = typetd.textContent || typetd.innerText;
      locaValue = locatd.textContent || locatd.innerText;
      if (nameValue.toUpperCase().indexOf(filter) > -1 || typeValue.toUpperCase().indexOf(filter) > -1 || locaValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
</script>
</html>