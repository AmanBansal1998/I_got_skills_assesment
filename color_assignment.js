const colorPool = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];

function getColorForType(type) {
  let colorIndex = 0;
  if (type === 'location') {
    colorIndex = Math.floor(Math.random() * colorPool.length);
  } else if (type === 'department') {
    colorIndex = (colorIndex + 1) % colorPool.length; // round-robin
  }
  return colorPool[colorIndex];
}
