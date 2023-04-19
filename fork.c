#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define BUFFER_SIZE 2048
#define ARG_SIZE 512

int main(void) {
    char buffer[BUFFER_SIZE];
    char *args[ARG_SIZE];
    extern char **environ;
    int status;
    pid_t pid;
    char *path, *dir, *cmd, *tmp;

    while (1) {
        printf("$ "); // display the prompt
        if (fgets(buffer, BUFFER_SIZE, stdin) == NULL) { // handle end of file
            printf("\n");
            break;
        }

        buffer[strcspn(buffer, "\n")] = '\0'; // remove trailing newline character
        char *token = strtok(buffer, " ");
        int i = 0;

        while (token != NULL) {
            args[i++] = token;
            token = strtok(NULL, " ");
        }

        args[i] = NULL;

        path = getenv("PATH"); // get the PATH environment variable
        dir = strtok(path, ":"); // get the first directory in the PATH

        while (dir != NULL) {
            tmp = malloc(strlen(dir) + strlen(args[0]) + 2); // allocate memory for the new path
            strcpy(tmp, dir); // copy the directory name to the temporary string
            strcat(tmp, "/"); // concatenate a forward slash to separate the directory and the command name
            strcat(tmp, args[0]); // concatenate the command name to the temporary string

            if (access(tmp, X_OK) == 0) { // check if the command exists and is executable
                cmd = tmp; // set the new path as the command
                break;
            }

            dir = strtok(NULL, ":"); // get the next directory in the PATH
            free(tmp); // free the temporary string
        }

        if (dir == NULL) { // if the command does not exist in any directory in the PATH
            printf("%s: command not found\n", args[0]);
            continue;
        }

        pid = fork(); // create a child process
        if (pid == -1) {
            perror("fork");
            return 1;
        } else if (pid == 0) {
            execve(cmd, args, environ); // execute the command
            perror("execve");
            return 1;
        } else {
            waitpid(pid, &status, 0); // wait for the child process to finish
            free(cmd); // free the memory allocated for the new path
        }
    }

    return 0;
}
