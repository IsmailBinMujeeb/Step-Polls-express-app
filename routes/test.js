const students = [
    { user: 'alice', class: 2 },
    { user: 'broke', class: 3 },
    { user: 'Yahiya', class: 2 },
    { user: 'alice', class: 2 },
    { user: 'broke', class: 3 },
    { user: 'Yahiya', class: 2 },
    { user: 'alice', class: 2 },
    { user: 'broke', class: 30 },
    { user: 'Yahiya', class: 2 },
    // Continue your objects here...
  ];
  
  const classCounts = students.reduce((counts, student) => {
    counts[student.class] = (counts[student.class] || 0) + 1;
    return counts;
  }, {});
  
  console.log(classCounts);
  