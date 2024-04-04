#include <stdio.h>

int main() {
  
    int number, array [5], *p_number, *p_array;

    p_number = &number;
    number = 10;
  
    printf("number =%d, adresa %p, na teto adrese je %d\n", number, p_number, *p_number)

    number++;
    (*p_number)++;
    printf("number =%d, adresa %p, na teto adrese je %d\n", number, p_number, *p_number)

    p_number++;
    printf("number =%d, adresa %p, na teto adrese je %d\n", number, p_number, *p_number)

    for (i=0; i<5;i++) {
        array[i] = (i+1) * 10;
    }

    p_array = array;

    for (i=0; i<5;i++) {

        *p_array += 100;
        printf("na adrese = %p je hodnota %d\n", p_array, *p_array)
        p_array++;
    }  

    return 0;
}



