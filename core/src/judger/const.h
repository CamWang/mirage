#ifndef CONST_H_
#define CONST_H_

#include <string>
#include <iostream>
#include <vector>
using namespace std;

enum class Lang
{
  c,    // C
  cpp,  // C++
  cs,   // C#
  java, // Java
  py,   // Python
  go,   // Golang
  js,   // JavaScript
  php   // PHP
};

enum class Result
{
  DEF, // Default
  SCE, // Security Check Error
  CE,  // Compile Error
  RE,  // Runtime Error
  TLE, // Time Limit Exxceeded
  MLE, // Memory Limit Exceeded
  OLE, // Output Limit Exceeded
  PE,  // Presentation Error
  WA,  // Wrong Answer
  AC   // Accepted
};

enum class Type
{
  normal,
  output,
  interact
};

#endif