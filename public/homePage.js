let logoutButton = new LogoutButton();
logoutButton.action = function() {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  });
}

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

let ratesBoard = new RatesBoard();
function getRates() { 
  ApiConnector.getStocks(
    function () {
      if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
    }
  )
}
getRates();
setInterval(getRates, 60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, "Пополнение прошло успешно!");
    }
    else {
      this.setMessage(false, response.error);
    }
  })
}

moneyManager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, "Конвертирование прошло успешно!");
    }
    else {
      this.setMessage(false, response.error);
    }
  })
}

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, "Перевод прошел успешно!");
    }
    else {
      this.setMessage(false, response.error);
    }
  })
}

let favourites = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
    favourites.clearTable();
    favourites.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
})

favourites.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favourites.clearTable();
      favourites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      this.setMessage(true, "Пользователь успешно добавлен!");
    }
    else {
      this.setMessage(false, response.error);
    }
  })
}

favourites.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favourites.clearTable();
      favourites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      this.setMessage(true, "Пользователь успешно удален!");
    }
    else {
      this.setMessage(false, response.error);
    }
  })
}