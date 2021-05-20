#ifndef CONST_H_
#define CONST_H_

#include <string>
#include <iostream>
#include <vector>
using namespace std;

// Task language
enum class Lang {
  c,    // C
  cpp,  // C++
  cs,   // C#
  java, // Java
  py,   // Python
  go,   // Golang
  js,   // JavaScript
  php   // PHP
};

// Task judge result
enum class Result {
  DEF, // Default 0
  SCE, // Security Check Error 1
  CE,  // Compile Error 2
  RE,  // Runtime Error 3 may be MLE and child process being killed
  TLE, // Time Limit Exxceeded 4
  MLE, // Memory Limit Exceeded 5
  OLE, // Output Limit Exceeded 6
  PE,  // Presentation Error 7
  WA,  // Wrong Answer 8
  AC   // Accepted 9
};

enum class Mode {
  OI,
  ACM
};

// Task type
enum class Type {
  normal,   // in and output file to judge
  output,   // only use output file to judge
  interact  // special judge
};

#endif