export const allPlayersRequestBody = () => {
  var formData = new FormData()
  var arr = {
    _selectedSeriesIds: 'on',
    _selectedPlayerSeriesId: 'on',
    _wicketFell: 'on',
    _selectedPlayerTeamId: 'on',
    seriesId: 7,
    _selectedMatchIds: 'on',
    _deliveryTypes: 'on',
    _selectedBatsmanIds: 'on',
    _selectedBowlerIds: 'on',
    _strikerRunsScored: 'on',
    _selectedInningsIds: 'on',
    _seriesPlayerBowler: 'on',
    scopeRootId: 7,
    scopeType: 'SERIES',
    _seriesPlayerBatsman: 'on',
    _selectedBatsmanTeamIds: 'on',
    scopeId: 7,
    _selectedBowlerTeamIds: 'on',
  }
  for (let key in arr) {
    formData.append(key, arr[key])
  }
  return formData
}

export const playersTypeRequestBody = (playerType) => {
  var formData = new FormData()
  var arr = {
    _selectedSeriesIds: 'on',
    _selectedPlayerSeriesId: 'on',
    _wicketFell: 'on',
    _selectedPlayerTeamId: 'on',
    seriesId: 7,
    _selectedMatchIds: 'on',
    playerType: playerType,
    _deliveryTypes: 'on',
    _selectedBatsmanIds: 'on',
    _selectedBowlerIds: 'on',
    _strikerRunsScored: 'on',
    _selectedInningsIds: 'on',
    _seriesPlayerBowler: 'on',
    scopeRootId: 7,
    scopeType: 'SERIES',
    _seriesPlayerBatsman: 'on',
    _selectedBatsmanTeamIds: 'on',
    scopeId: 7,
    _selectedBowlerTeamIds: 'on',
  }
  for (let key in arr) {
    formData.append(key, arr[key])
  }
  return formData
}

export const baseFormData = {
  _selectedSeriesIds: 'on',
  _selectedPlayerSeriesId: 'on',
  _wicketFell: 'on',
  _selectedPlayerTeamId: 'on',
  seriesId: 7,
  _selectedMatchIds: 'on',
  _deliveryTypes: 'on',
  _selectedBatsmanIds: 'on',
  _selectedBowlerIds: 'on',
  _strikerRunsScored: 'on',
  _selectedInningsIds: 'on',
  _seriesPlayerBowler: 'on',
  scopeRootId: 7,
  _seriesPlayerBatsman: 'on',
  _selectedBatsmanTeamIds: 'on',
  scopeId: 7,
  _selectedBowlerTeamIds: 'on',
  scopeType: 'SERIES',
}
